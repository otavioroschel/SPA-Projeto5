import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { CartItem } from '../components/CartItem/CartItem'
import { CartSummary } from '../components/CartSummary/CartSummary'
import { DeliveryAddressForm } from '../components/DeliveryAddressForm/DeliveryAddressForm'
import { EmptyCart } from '../components/EmptyCart/EmptyCart'
import { PageLayout } from '../components/PageLayout/PageLayout'
import { PaymentMethodSelector } from '../components/PaymentMethodSelector/PaymentMethodSelector'
import { useCart } from '../hooks/useCart'
import { useCep } from '../hooks/useCep'
import { checkoutSchema } from '../schemas/checkoutSchema'
import type { CheckoutFormData } from '../schemas/checkoutSchema'
import type { UF } from '../types/address'
import { buildOrder, saveLastOrder } from '../utils/order'

const PageGrid = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 448px);
  align-items: start;
  gap: 32px;
  padding-top: 8px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ColumnTitle = styled.h1`
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.titleS};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.subtitle};
`

const ColumnTitleSecondary = styled(ColumnTitle).attrs({ as: 'h2' })``

const SummaryCard = styled.aside`
  padding: 40px;
  border-radius: 6px 44px 6px 44px;
  background: ${({ theme }) => theme.colors.card};

  @media (max-width: 559px) {
    padding: 24px;
  }
`

const ItemsList = styled.ul`
  margin: 0 0 24px;
  padding: 0;
  list-style: none;
`

const Divider = styled.hr`
  margin: 0 0 24px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
`

export const Checkout = () => {
  const navigate = useNavigate()
  const { lines, totals, clearCart } = useCart()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      address: {
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        uf: undefined,
      },
      paymentMethod: undefined,
    },
  })

  const cepValue = useWatch({ control, name: 'address.cep' })
  const { status: cepStatus, address: cepAddress } = useCep(cepValue ?? '')

  useEffect(() => {
    if (!cepAddress) return

    setValue('address.street', cepAddress.street, { shouldValidate: true })
    setValue('address.neighborhood', cepAddress.neighborhood, { shouldValidate: true })
    setValue('address.city', cepAddress.city, { shouldValidate: true })
    setValue('address.uf', cepAddress.uf as UF, { shouldValidate: true })
  }, [cepAddress, setValue])

  const onValid = (data: CheckoutFormData) => {
    if (lines.length === 0) return

    const order = buildOrder(data, lines, totals)
    saveLastOrder(order)
    clearCart()
    navigate('/success')
  }

  const onInvalid = (formErrors: typeof errors) => {
    if (formErrors.address?.cep) return setFocus('address.cep')
    if (formErrors.address?.street) return setFocus('address.street')
    if (formErrors.address?.number) return setFocus('address.number')
    if (formErrors.address?.neighborhood) return setFocus('address.neighborhood')
    if (formErrors.address?.city) return setFocus('address.city')
    if (formErrors.address?.uf) return setFocus('address.uf')
    if (formErrors.paymentMethod) return setFocus('paymentMethod')
  }

  if (lines.length === 0) {
    return (
      <PageLayout>
        <EmptyWrapper>
          <ColumnTitle as="h1">Complete seu pedido</ColumnTitle>
          <EmptyCart />
        </EmptyWrapper>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <PageGrid onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
        <Column>
          <ColumnTitle>Complete seu pedido</ColumnTitle>
          <DeliveryAddressForm register={register} errors={errors} cepStatus={cepStatus} />
          <PaymentMethodSelector register={register} errors={errors} />
        </Column>

        <Column>
          <ColumnTitleSecondary>Cafés selecionados</ColumnTitleSecondary>
          <SummaryCard>
            <ItemsList>
              {lines.map((line) => (
                <CartItem key={line.coffeeId} line={line} />
              ))}
            </ItemsList>
            <Divider />
            <CartSummary submitDisabled={lines.length === 0} />
          </SummaryCard>
        </Column>
      </PageGrid>
    </PageLayout>
  )
}

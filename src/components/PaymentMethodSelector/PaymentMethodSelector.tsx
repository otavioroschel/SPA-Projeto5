import { Bank, CreditCard, CurrencyDollar, Money } from '@phosphor-icons/react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'

import type { CheckoutFormData } from '../../schemas/checkoutSchema'

const Card = styled.section`
  padding: 40px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.card};

  @media (max-width: 559px) {
    padding: 24px;
  }
`

const SectionHeader = styled.header`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.colors.accentDark};

  h2 {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.textM};
    color: ${({ theme }) => theme.colors.subtitle};
  }

  p {
    margin-top: 2px;
    font-size: ${({ theme }) => theme.fontSizes.textS};
    color: ${({ theme }) => theme.colors.text};
  }
`

const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 559px) {
    grid-template-columns: 1fr;
  }
`

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.buttonBg};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.buttonM};
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  svg {
    color: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }

  &:has(input:checked) {
    background: ${({ theme }) => theme.colors.accentSoft};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`

const ErrorText = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`

const options = [
  { value: 'credit', label: 'Cartão de Crédito', Icon: CreditCard },
  { value: 'debit', label: 'Cartão de Débito', Icon: Bank },
  { value: 'cash', label: 'Dinheiro', Icon: Money },
] as const

interface PaymentMethodSelectorProps {
  register: UseFormRegister<CheckoutFormData>
  errors: FieldErrors<CheckoutFormData>
}

export const PaymentMethodSelector = ({ register, errors }: PaymentMethodSelectorProps) => (
  <Card aria-labelledby="pagamento-title">
    <SectionHeader>
      <CurrencyDollar size={22} aria-hidden />
      <div>
        <h2 id="pagamento-title">Pagamento</h2>
        <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
      </div>
    </SectionHeader>

    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="sr-only">Forma de pagamento</legend>
      <Options>
        {options.map(({ value, label, Icon }) => (
          <Option key={value}>
            <input
              type="radio"
              value={value}
              {...register('paymentMethod')}
              className="sr-only"
            />
            <Icon size={18} aria-hidden />
            {label}
          </Option>
        ))}
      </Options>
    </fieldset>

    {errors.paymentMethod && (
      <ErrorText role="alert">{errors.paymentMethod.message}</ErrorText>
    )}
  </Card>
)

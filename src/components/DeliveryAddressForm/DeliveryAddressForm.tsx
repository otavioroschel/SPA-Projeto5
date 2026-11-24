import { MapPinLine } from '@phosphor-icons/react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'

import type { CheckoutFormData } from '../../schemas/checkoutSchema'
import type { CepStatus } from '../../types/cep'
import { formatCep } from '../../utils/format'
import { UFS } from '../../schemas/ufs'

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
  color: ${({ theme }) => theme.colors.primaryHover};

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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 559px) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div<{ $span?: number }>`
  grid-column: span ${({ $span = 1 }) => $span};
  min-width: 0;

  @media (max-width: 559px) {
    grid-column: 1 / -1;
  }
`

const InputWrapper = styled.div`
  position: relative;
`

const inputStyles = `
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: var(--field-bg);
  color: var(--field-text);
  font-size: 14px;

  &::placeholder {
    color: var(--field-placeholder);
  }

  &:focus {
    border-color: var(--field-focus);
  }

  &[aria-invalid='true'] {
    border-color: var(--field-error);
  }
`

const Input = styled.input`
  ${inputStyles}
  --field-bg: ${({ theme }) => theme.colors.surfaceAlt};
  --field-text: ${({ theme }) => theme.colors.text};
  --field-placeholder: ${({ theme }) => theme.colors.textMuted};
  --field-focus: ${({ theme }) => theme.colors.primaryHover};
  --field-error: ${({ theme }) => theme.colors.error};
`

const Select = styled.select`
  ${inputStyles}
  --field-bg: ${({ theme }) => theme.colors.surfaceAlt};
  --field-text: ${({ theme }) => theme.colors.text};
  --field-placeholder: ${({ theme }) => theme.colors.textMuted};
  --field-focus: ${({ theme }) => theme.colors.primaryHover};
  --field-error: ${({ theme }) => theme.colors.error};
  appearance: none;
`

const Optional = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-size: 12px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
`

const Feedback = styled.p`
  margin-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`

const ErrorText = styled.p`
  margin-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`

interface DeliveryAddressFormProps {
  register: UseFormRegister<CheckoutFormData>
  errors: FieldErrors<CheckoutFormData>
  cepStatus: CepStatus
}

const getCepFeedback = (status: CepStatus): string => {
  switch (status) {
    case 'loading':
      return 'Buscando endereço…'
    case 'not-found':
      return 'CEP não encontrado. Preencha o endereço manualmente.'
    case 'error':
      return 'Não foi possível consultar o CEP. Preencha manualmente ou tente novamente.'
    default:
      return ''
  }
}

export const DeliveryAddressForm = ({ register, errors, cepStatus }: DeliveryAddressFormProps) => {
  const cepField = register('address.cep')
  const cepError = errors.address?.cep?.message
  const feedback = getCepFeedback(cepStatus)
  const cepHasProblem = Boolean(cepError) || cepStatus === 'not-found' || cepStatus === 'error'

  return (
    <Card aria-labelledby="endereco-title">
      <SectionHeader>
        <MapPinLine size={22} aria-hidden />
        <div>
          <h2 id="endereco-title">Endereço de Entrega</h2>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </div>
      </SectionHeader>

      <FormGrid>
        <Field $span={1}>
          <label htmlFor="cep" className="sr-only">
            CEP
          </label>
          <Input
            id="cep"
            {...cepField}
            onChange={(event) => {
              event.target.value = formatCep(event.target.value)
              void cepField.onChange(event)
            }}
            placeholder="CEP"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={9}
            aria-invalid={cepHasProblem}
            aria-describedby="cep-feedback"
          />
          {cepError && <ErrorText role="alert">{cepError}</ErrorText>}
          {!cepError && feedback && (
            <Feedback id="cep-feedback" role="status" aria-live="polite">
              {feedback}
            </Feedback>
          )}
          {!cepError && !feedback && <span id="cep-feedback" className="sr-only" />}
        </Field>

        <Field $span={3}>
          <label htmlFor="street" className="sr-only">
            Rua
          </label>
          <Input
            id="street"
            {...register('address.street')}
            placeholder="Rua"
            autoComplete="address-line1"
            aria-invalid={Boolean(errors.address?.street)}
            aria-describedby={errors.address?.street ? 'street-error' : undefined}
          />
          {errors.address?.street && (
            <ErrorText id="street-error" role="alert">
              {errors.address.street.message}
            </ErrorText>
          )}
        </Field>

        <Field $span={1}>
          <label htmlFor="number" className="sr-only">
            Número
          </label>
          <Input
            id="number"
            {...register('address.number')}
            placeholder="Número"
            inputMode="numeric"
            autoComplete="address-line2"
            aria-invalid={Boolean(errors.address?.number)}
            aria-describedby={errors.address?.number ? 'number-error' : undefined}
          />
          {errors.address?.number && (
            <ErrorText id="number-error" role="alert">
              {errors.address.number.message}
            </ErrorText>
          )}
        </Field>

        <Field $span={2}>
          <label htmlFor="complement" className="sr-only">
            Complemento (opcional)
          </label>
          <InputWrapper>
            <Input
              id="complement"
              {...register('address.complement')}
              placeholder="Complemento"
              autoComplete="address-line3"
              aria-invalid={Boolean(errors.address?.complement)}
              aria-describedby={errors.address?.complement ? 'complement-error' : undefined}
              style={{ paddingRight: 84 }}
            />
            <Optional>Opcional</Optional>
          </InputWrapper>
          {errors.address?.complement && (
            <ErrorText id="complement-error" role="alert">
              {errors.address.complement.message}
            </ErrorText>
          )}
        </Field>

        <Field $span={1}>
          <label htmlFor="neighborhood" className="sr-only">
            Bairro
          </label>
          <Input
            id="neighborhood"
            {...register('address.neighborhood')}
            placeholder="Bairro"
            autoComplete="address-level3"
            aria-invalid={Boolean(errors.address?.neighborhood)}
            aria-describedby={errors.address?.neighborhood ? 'neighborhood-error' : undefined}
          />
          {errors.address?.neighborhood && (
            <ErrorText id="neighborhood-error" role="alert">
              {errors.address.neighborhood.message}
            </ErrorText>
          )}
        </Field>

        <Field $span={1}>
          <label htmlFor="city" className="sr-only">
            Cidade
          </label>
          <Input
            id="city"
            {...register('address.city')}
            placeholder="Cidade"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.address?.city)}
            aria-describedby={errors.address?.city ? 'city-error' : undefined}
          />
          {errors.address?.city && (
            <ErrorText id="city-error" role="alert">
              {errors.address.city.message}
            </ErrorText>
          )}
        </Field>

        <Field $span={1}>
          <label htmlFor="uf" className="sr-only">
            UF
          </label>
          <Select
            id="uf"
            {...register('address.uf')}
            aria-invalid={Boolean(errors.address?.uf)}
            aria-describedby={errors.address?.uf ? 'uf-error' : undefined}
            defaultValue=""
          >
            <option value="" disabled>
              UF
            </option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </Select>
          {errors.address?.uf && (
            <ErrorText id="uf-error" role="alert">
              {errors.address.uf.message}
            </ErrorText>
          )}
        </Field>
      </FormGrid>
    </Card>
  )
}

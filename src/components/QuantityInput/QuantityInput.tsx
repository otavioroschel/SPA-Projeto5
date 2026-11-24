import { Minus, Plus } from '@phosphor-icons/react'
import styled from 'styled-components'

import { MAX_QTY, MIN_QTY } from '../../utils/pricing'

interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  label: string
  min?: number
  max?: number
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.buttonBg};
`

const StepButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};
  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.buttonHover};
    color: ${({ theme }) => theme.colors.accentDark};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const Value = styled.span`
  min-width: 22px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.textM};
  color: ${({ theme }) => theme.colors.text};
`

export const QuantityInput = ({
  value,
  onChange,
  label,
  min = MIN_QTY,
  max = MAX_QTY,
}: QuantityInputProps) => {
  const decrease = () => onChange(Math.max(min, value - 1))
  const increase = () => onChange(Math.min(max, value + 1))

  return (
    <Wrapper role="group" aria-label={`Quantidade de ${label}`}>
      <StepButton
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label={`Diminuir quantidade de ${label}`}
      >
        <Minus size={14} weight="bold" aria-hidden />
      </StepButton>
      <Value aria-live="polite">{value}</Value>
      <StepButton
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label={`Aumentar quantidade de ${label}`}
      >
        <Plus size={14} weight="bold" aria-hidden />
      </StepButton>
    </Wrapper>
  )
}

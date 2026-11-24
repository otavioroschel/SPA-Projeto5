import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../App'
import { STORAGE_KEYS } from '../utils/storage'

const renderApp = (route = '/') => {
  window.history.pushState({}, '', route)
  return render(<App />)
}

const addFirstCoffee = async (user: ReturnType<typeof userEvent.setup>) => {
  const buttons = await screen.findAllByRole('button', { name: /Adicionar .* ao carrinho/ })
  await user.click(buttons[0])
}

const mockCepSuccess = () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        cep: '90250-440',
        logradouro: 'Rua João Daniel Martinelli',
        bairro: 'Farrapos',
        localidade: 'Porto Alegre',
        uf: 'RS',
      }),
    }),
  )
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('fluxos principais', () => {
  it('TC-20/21 — Home exibe o catálogo e o contador soma unidades', async () => {
    const user = userEvent.setup()
    renderApp('/')

    expect(await screen.findByRole('heading', { name: 'Nossos cafés' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Expresso Tradicional' })).toBeInTheDocument()

    await addFirstCoffee(user)
    await addFirstCoffee(user)

    expect(screen.getByRole('link', { name: /Carrinho com 2 itens/ })).toBeInTheDocument()
  })

  it('TC-23 — refresh recupera o carrinho do localStorage', async () => {
    const user = userEvent.setup()
    const { unmount } = renderApp('/')

    await addFirstCoffee(user)
    expect(screen.getByRole('link', { name: /Carrinho com 1 item/ })).toBeInTheDocument()

    unmount()
    renderApp('/')

    expect(screen.getByRole('link', { name: /Carrinho com 1 item/ })).toBeInTheDocument()
  })

  it('TC-22 — alterar o carrinho atualiza os totais', async () => {
    const user = userEvent.setup()
    renderApp('/')

    const addButtons = await screen.findAllByRole('button', { name: /Adicionar .* ao carrinho/ })
    await user.click(addButtons[0])
    await user.click(addButtons[1])

    await user.click(screen.getByRole('link', { name: /Carrinho com 2 itens/ }))
    await screen.findByRole('heading', { name: 'Complete seu pedido' })

    expect(screen.getByText('R$ 19,80')).toBeInTheDocument()
    expect(screen.getByText('R$ 23,30')).toBeInTheDocument()

    const increaseButtons = screen.getAllByRole('button', { name: /Aumentar quantidade/ })
    await user.click(increaseButtons[0])

    expect(await screen.findByText('R$ 33,20')).toBeInTheDocument()
  })

  it('TC-26 — formulário inválido bloqueia a confirmação', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await addFirstCoffee(user)
    await user.click(screen.getByRole('link', { name: /Carrinho com 1 item/ }))
    await screen.findByRole('heading', { name: 'Complete seu pedido' })

    await user.click(screen.getByRole('button', { name: /Confirmar Pedido/i }))

    expect(await screen.findByText('Informe um CEP válido (8 dígitos)')).toBeInTheDocument()
    expect(screen.getByText('Selecione a forma de pagamento')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Complete seu pedido' })).toBeInTheDocument()
    expect(screen.getByLabelText('CEP')).toHaveFocus()
  })

  it('TC-24 — CEP válido preenche os campos e não altera número', async () => {
    mockCepSuccess()
    const user = userEvent.setup()
    renderApp('/')

    await addFirstCoffee(user)
    await user.click(screen.getByRole('link', { name: /Carrinho com 1 item/ }))
    await screen.findByRole('heading', { name: 'Complete seu pedido' })

    await user.type(screen.getByLabelText('CEP'), '90250440')

    await waitFor(() => expect(screen.getByLabelText('Rua')).toHaveValue('Rua João Daniel Martinelli'))
    expect(screen.getByLabelText('Bairro')).toHaveValue('Farrapos')
    expect(screen.getByLabelText('Cidade')).toHaveValue('Porto Alegre')
    expect(screen.getByLabelText('UF')).toHaveValue('RS')
    expect(screen.getByLabelText('Número')).toHaveValue('')
  })

  it('TC-27/28 — pedido válido navega para sucesso, limpa o carrinho e persiste o snapshot', async () => {
    mockCepSuccess()
    const user = userEvent.setup()
    const { unmount } = renderApp('/')

    await addFirstCoffee(user)
    await user.click(screen.getByRole('link', { name: /Carrinho com 1 item/ }))
    await screen.findByRole('heading', { name: 'Complete seu pedido' })

    await user.type(screen.getByLabelText('CEP'), '90250440')
    await waitFor(() => expect(screen.getByLabelText('Cidade')).toHaveValue('Porto Alegre'))

    await user.type(screen.getByLabelText('Número'), '102')
    await user.click(screen.getByRole('radio', { name: /Cartão de Crédito/i }))
    await user.click(screen.getByRole('button', { name: /Confirmar Pedido/i }))

    expect(await screen.findByRole('heading', { name: /Uhu! Pedido confirmado/ })).toBeInTheDocument()
    expect(screen.getByText(/Rua João Daniel Martinelli, 102/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Carrinho vazio' })).toBeInTheDocument()

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) ?? 'null')).toEqual([])
    })

    unmount()
    renderApp('/success')

    expect(await screen.findByRole('heading', { name: /Uhu! Pedido confirmado/ })).toBeInTheDocument()
  })

  it('TC-28 — /success sem pedido válido exibe estado vazio', async () => {
    renderApp('/success')

    expect(await screen.findByRole('heading', { name: 'Nenhum pedido encontrado' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voltar para a Home' })).toBeInTheDocument()
  })

  it('TC-29 — tema alterna e persiste', async () => {
    const user = userEvent.setup()
    const { unmount } = renderApp('/')

    const toggle = await screen.findByRole('button', { name: 'Ativar tema escuro' })
    await user.click(toggle)

    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument()
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('"dark"')

    unmount()
    renderApp('/')

    expect(await screen.findByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument()
  })
})

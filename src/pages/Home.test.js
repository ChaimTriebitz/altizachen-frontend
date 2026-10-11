import { render, screen } from '@testing-library/react'
import { Home } from './Home'

jest.mock('../cmps', () => ({
   Posts: () => null,
   RecentlyViewed: () => null
}))

describe('Home page', () => {
   test('renders the marketplace introduction', () => {
      render(<Home />)

      expect(screen.getByRole('heading', { name: /find it\. sell it\./i })).toBeInTheDocument()
      expect(screen.getByText(/buy and sell second-hand items/i)).toBeInTheDocument()
   })
})

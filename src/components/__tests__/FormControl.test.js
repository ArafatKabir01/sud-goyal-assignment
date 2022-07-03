import { render, screen, cleanup } from '@testing-library/react'
import FromControl from '../FormControl'

test('render the form control component', () => {
    render(<FromControl />)
    const formControlElement = screen.getByTestId('form-1');
    expect(formControlElement).toBeInTheDocument();
})
import Comments from './Comments'
import {render} from '@testing-library/react'

describe("Comments", () => {
    test('Should render without crash', async () => {
        render(<Comments/>)
    })
})
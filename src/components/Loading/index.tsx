import { LoaderContainer, InsideLoader, OutsideLoader } from './styles'

export function Loading() {
  return (
    <LoaderContainer>
      <OutsideLoader>
        <InsideLoader></InsideLoader>
      </OutsideLoader>
    </LoaderContainer>
  )
}

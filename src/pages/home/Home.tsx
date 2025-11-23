import SearchBar from '../../components/SearchBar/SearchBar'
import MediaCard from '../../components/LocalCard/Card'
import ColorCheckboxes from '../../components/Checkbox'
import { StoreType } from '../../domain/store'
import { storeService } from '../../services/LocalesService'
import { useState } from 'react'
import { useOnInit } from '../../customHooks/useOnInit'
import {
  HomeContainer,
  HeaderContainer,
  TitleTypography,
  SearchContainer,
  ContentBox,
  StoresCountTypography,
  CardsContainer
} from './StyledHome'

const Home = () => {
  const [searchValue, setSearchValue] = useState('')
  const [allStores, setAllStores] = useState<StoreType[]>([]) 
  const [isChecked, setIsChecked] = useState(false)

  let stores: StoreType[]
  if (isChecked === true) {
    stores = allStores.filter((store: StoreType) => {
      return store.usuarioCercano === true
    })
  } else {
    stores = allStores
  }

  const buscarStores = async (textoBusquedaNuevo: string) => {
    setSearchValue(textoBusquedaNuevo)
    const userId = localStorage.getItem('id')!! 
    const nuevosStores = await storeService.getStores(textoBusquedaNuevo, userId)
    setAllStores(nuevosStores)
  }

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)
  }

  useOnInit(() => {
    buscarStores('')
  })

  return (
    <HomeContainer>
      <HeaderContainer>
        <TitleTypography>
          Delivery
        </TitleTypography>
      </HeaderContainer>
      
      <SearchContainer>
        <SearchBar onSearch={buscarStores} searchValue={searchValue} />
      </SearchContainer>
      
      <ContentBox>
        <ColorCheckboxes 
          isChecked={isChecked}
          onCheckboxChange={handleCheckboxChange}
        />
        
        {isChecked && (
          <StoresCountTypography variant="body2">
            Mostrando {stores.length} locales cercanos
          </StoresCountTypography>
        )}
        
        <CardsContainer>
          <MediaCard stores={stores} />
        </CardsContainer>
      </ContentBox>
    </HomeContainer>
  )
}

export default Home
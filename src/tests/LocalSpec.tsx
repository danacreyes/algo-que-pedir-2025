import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
// import { TareasComponent } from '..pages/'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import axios from 'axios'

const mockTareas =
  [
    {
      id: 68, 
      descripcion: 'Desarrollar TODO List en React', 
      porcentajeCumplimiento: 75, 
      asignadoA: 'Paula Paretto'
    },
    {
      id: 159, 
      descripcion: 'Construir test TODO List', 
      porcentajeCumplimiento: 0, 
      asignadoA: 'Eliana Mendia'
    }
  ]
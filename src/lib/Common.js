import { Notify } from 'quasar'
import Constants from './Constants'

export function modelFactory (className, params = null) {
  className = className.toUpperCase()
  return new Constants[className](params)
}

export function notify (type) {
  switch (type) {
    case 'success create':
      Notify.create({ message: 'Inserido com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
      break
    case 'fail create':
      Notify.create({ message: 'Erro ao inserir', type: 'negative', icon: 'fas fa-exclamation-triangle' })
      break
    case 'success update':
      Notify.create({ message: 'Salvo com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
      break
    case 'fail update':
      Notify.create({ message: 'Erro ao salvar', type: 'negative', icon: 'fas fa-exclamation-triangle' })
      break
    case 'success remove':
      Notify.create({ message: 'Removido com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
      break
    case 'fail remove':
      Notify.create({ message: 'Erro ao remover', type: 'negative', icon: 'fas fa-exclamation-triangle' })
      break
    case 'fail validation':
      Notify.create({ message: 'Erro ao validar as informações', type: 'negative', icon: 'fas fa-exclamation-triangle' })
      break
  }
}

export function snakeToCamel (str) {
  return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
}

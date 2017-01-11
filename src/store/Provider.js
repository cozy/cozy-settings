import { Component } from 'preact'

export default class Provider extends Component {
  getChildContext () {
    return { store: this.store }
  }

  constructor (props, context) {
    super(props, context)
    this.store = props.store
  }

  render ({children}) {
    return children && children[0] || null
  }
}

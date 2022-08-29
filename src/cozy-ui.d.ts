declare module 'cozy-ui/transpiled/react/MuiCozyTheme/List' {
  import List from '@material-ui/core/List'
  export default List
}

declare module 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader' {
  import ListSubheader from '@material-ui/core/ListSubheader'
  export default ListSubheader
}

declare module 'cozy-ui/transpiled/react/MuiCozyTheme/Divider' {
  import Divider from '@material-ui/core/Divider'
  export default Divider
}

declare module 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem' {
  import ListItem from '@material-ui/core/ListItem'
  export default ListItem
}

declare module 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon' {
  import ListItemIcon from '@material-ui/core/ListItemIcon'
  export default ListItemIcon as ListItemIcon & { align: string }
}

declare module 'cozy-ui/transpiled/react/ListItemText' {
  import ListItemText from '@material-ui/core/ListItemText'
  export default ListItemText as ListItemText & { align: string }
}

declare module 'cozy-ui/transpiled/react/Icon' {
  type IconProps = {
    icon: string | object | ((args: unknown) => React.ReactNode) | JSX.Element
    width?: string | number
    height?: string | number
    color?: string | object
    className?: string
    preserveColor?: boolean
    size?: string | number
    spin?: boolean
  }

  export default function Icon(props: IconProps): JSX.Element
}

declare module 'cozy-ui/transpiled/react/Icons/*' {
  import Icon from '@material-ui/core/Icon'

  export default Icon as JSX.Element
}

declare module 'cozy-ui/transpiled/react/I18n' {
  const useI18n = (): {
    t: (key: string, vars?: Record<string, unknown>) => string
  } => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      t: (key: string) => string as string
    }
  }

  export { useI18n }
}

declare module 'cozy-ui/transpiled/react/switch' {
  import Switch from '@material-ui/core/Switch'
  export default Switch
}

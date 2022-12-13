import Link from 'next/link'
import classes from './button.module.css'

interface IButton {
  link?: string
  children: React.ReactNode
  onClick?: any
}

export default function Button(props: IButton) {
  if (props.link) {
    return (
      <Link legacyBehavior href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    )
  }
  return <button className={classes.btn} onClick={props.onClick}>{props.children}</button>
}

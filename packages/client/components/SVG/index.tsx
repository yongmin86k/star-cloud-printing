import { SvgProps } from "react-native-svg"
import Printer from "../../assets/noun-printer-55059.svg"
import User from "../../assets/noun-user-7118042.svg"
import Email from "../../assets/noun-email-5230114.svg"
import Password from "../../assets/noun-lock-6928418.svg"
import Add from "../../assets/noun-add-929467.svg"

export type TSVGName = "printer" | "user" | "email" | "password" | "add"

interface Props extends SvgProps {
  name: TSVGName
}

export default function SVG(props: Props) {
  const { name, ...otherProps } = props

  switch (name) {
    case "add":
      return <Add {...otherProps} />
    case "printer":
      return <Printer {...otherProps} />
    case "user":
      return <User {...otherProps} />
    case "email":
      return <Email {...otherProps} />
    case "password":
      return <Password {...otherProps} />
    default:
      return null
  }
}

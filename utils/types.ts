import { SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

export interface IconBoardProps{
	text?: string,
	icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
		muiName: string} ,
	alt?: string
	id?: number
}
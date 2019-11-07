import React, { useCallback, useState } from 'react'

import { arrayToMap } from '../../libs/map'

type Props = {
  children: React.ReactNode
  iconPosition?: 'left' | 'right'
  displayIcon?: boolean
  expandableMultiply?: boolean
  defaultExpanded?: string[]
  className?: string
  onClick?: (expandedItems: string[]) => void
}

// TODO: any
export const AccordionPanelContext = React.createContext<any>({
  expandedItems: '',
  icon: 'left',
  onClick: () => {},
})

export const AccordionPanel: React.FC<Props> = ({
  children,
  iconPosition = 'left',
  displayIcon = true,
  expandableMultiply = false,
  defaultExpanded = [],
  className = '',
  onClick: onClickProps,
}) => {
  const [expandedItems, setExpanded] = useState(new Map(arrayToMap(defaultExpanded)))

  const onClickTrigger = useCallback(
    (itemName: string, isExpanded: boolean) => {
      if (expandableMultiply) {
        isExpanded ? expandedItems.set(itemName, itemName) : expandedItems.delete(itemName)
        setExpanded(new Map(expandedItems))
      } else {
        isExpanded ? setExpanded(new Map([[itemName, itemName]])) : setExpanded(new Map())
      }
    },
    [expandableMultiply, expandedItems],
  )

  return (
    <AccordionPanelContext.Provider
      value={{ onClickTrigger, onClickProps, expandedItems, iconPosition, displayIcon }}
    >
      <div className={className}>{children}</div>
    </AccordionPanelContext.Provider>
  )
}

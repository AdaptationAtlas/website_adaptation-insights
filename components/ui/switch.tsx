'use client'

import React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import classNames from 'classnames'

type Props = {
  switchToggled: boolean
  setSwitchToggled: (checked: boolean) => void
  label: string
  options: string[]
  colors: boolean
  isLarge: boolean
}

const Switch = ({ switchToggled, setSwitchToggled, label, options, colors, isLarge }: Props) => {
  // Define class names for large and small sizes
  const switchClass = isLarge ? 'w-[35px] h-[22px]' : 'w-[22px] h-[14px]';
  const thumbClass = isLarge ? 'w-[16px] h-[16px] translate-x-[3px] data-[state=checked]:translate-x-[16px]' : 'w-[10px] h-[10px] translate-x-[2px] data-[state=checked]:translate-x-[10px]';
  const labelClass = isLarge ? 'text-[20px]' : 'text-sm';

  const handleLabelClick = () => {
    setSwitchToggled(!switchToggled)
  }

  return (
    <form className='py-1'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {label &&
          <label className='uppercase text-sm text-grey-700 pr-5' style={{ paddingRight: 15 }}>
            {label}
          </label>
        }
        <span
          onClick={handleLabelClick} className={classNames(
            labelClass,
            'uppercase text-black cursor-pointer',
            { 'text-grey-300': switchToggled },
            { 'text-brand-teal': colors && !switchToggled }
          )}>{options[0]}</span>
        <SwitchPrimitive.Root
          checked={switchToggled}
          className={classNames(
            switchClass,
            'mx-2 bg-grey-200 rounded-full relative outline-none cursor-pointer',
            { 'bg-brand-light-teal': colors && !switchToggled },
            { 'bg-brand-light-gold': colors && switchToggled }
          )}
          onCheckedChange={setSwitchToggled}
        >
          <SwitchPrimitive.Thumb className={classNames(
            thumbClass,
            // TODO - add transition animation back into the switch component
            // 'block bg-black rounded-full transition-transform duration-100 will-change-transform'
            'block bg-black rounded-full',
            { 'bg-brand-teal': colors && !switchToggled },
            { 'bg-brand-dark-gold': colors && switchToggled }
          )} />
        </SwitchPrimitive.Root>
        <span
          onClick={handleLabelClick}
          className={classNames(
            labelClass,
            'uppercase text-black cursor-pointer',
            { 'text-grey-300': !switchToggled },
            { 'text-brand-dark-gold': colors && switchToggled }
          )}>{options[1]}</span>
      </div>
    </form>
  )
}

export default Switch
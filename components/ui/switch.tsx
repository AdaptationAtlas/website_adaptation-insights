import React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import classNames from 'classnames'

type Props = {
  switchToggled: boolean
  setSwitchToggled: React.Dispatch<boolean>
  label: string
  options: string[]
  isLarge: boolean
}

const Switch = ({ switchToggled, setSwitchToggled, label, options, isLarge }: Props) => {
  const onViewByToggle = (checked: boolean) => {
    setSwitchToggled(checked)
  }

  // Define class names for large and small sizes
  const switchClass = isLarge ? 'w-[35px] h-[22px]' : 'w-[22px] h-[14px]';
  const thumbClass = isLarge ? 'w-[16px] h-[16px] translate-x-[3px] data-[state=checked]:translate-x-[16px]' : 'w-[10px] h-[10px] translate-x-[2px] data-[state=checked]:translate-x-[10px]';
  const labelClass = isLarge ? 'text-[20px]' : 'text-sm';

  return (
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {label &&
          <label className='pr-5' style={{ paddingRight: 15 }}>
            {label}
          </label>
        }
        <span className={classNames(
          labelClass,
          'uppercase text-black',
          { 'text-grey-300': switchToggled }
        )}>{options[0]}</span>
        <SwitchPrimitive.Root
          className={classNames(
            switchClass,
            'mx-2 bg-grey-200 rounded-full relative outline-none cursor-pointer'
          )}
          onCheckedChange={onViewByToggle}
        >
          <SwitchPrimitive.Thumb className={classNames(
            thumbClass,
            'block bg-black rounded-full transition-transform duration-100 will-change-transform'
          )} />
        </SwitchPrimitive.Root>
        <span className={classNames(
          labelClass,
          'uppercase text-black',
          { 'text-grey-300': !switchToggled }
        )}>{options[1]}</span>
      </div>
    </form>
  )
}

export default Switch
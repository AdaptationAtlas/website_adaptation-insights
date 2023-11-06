import React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import classNames from 'classnames'

type Props = {
  viewByBudget: boolean
  setViewByBudget: React.Dispatch<boolean>
  label: string
  options: string[]
}

const Switch = ({ viewByBudget, setViewByBudget, label, options }: Props) => {
  const onViewByToggle = (checked: boolean) => {
    setViewByBudget(checked)
  }
  return (
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label className='pr-5' htmlFor='view-projects-by' style={{ paddingRight: 15 }}>
          {label}
        </label>
        <span className={classNames(
          'uppercase text-sm',
          { 'font-bold': !viewByBudget }
        )}>{options[0]}</span>
        <SwitchPrimitive.Root
          className='w-[42px] h-[25px] mx-2 bg-black rounded-full relative outline-none cursor-pointer'
          id='view-projects-by'
          onCheckedChange={onViewByToggle}
        >
          <SwitchPrimitive.Thumb className='block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]' />
        </SwitchPrimitive.Root>
        <span className={classNames(
          'uppercase text-sm',
          { 'font-bold': viewByBudget }
        )}>{options[1]}</span>
      </div>
    </form>
  )
}

export default Switch
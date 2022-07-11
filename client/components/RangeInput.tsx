import { ChangeEvent, KeyboardEventHandler, useState } from "react"
import styles from "scss/components/RangeInput.module.scss"

interface Props {
    onDone?: (min: number, max: number) => void
}

const NumberInput = ({ rangeType = "min", handler, max }: { rangeType?: "min" | "max"; handler: (num: number) => void, max : number } ) => {
    const defaultValue = rangeType === "min" ? Number.MIN_VALUE : Number.MAX_VALUE
    const [num, setNum] = useState(defaultValue)
    const onKeyPress: KeyboardEventHandler = (evt) => {
        if (evt.which < 48 || evt.which > 57) {
            evt.preventDefault()
        }
    }
    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const newNum = Number.parseInt(evt.target.value) || defaultValue
        setNum(newNum)
        handler(newNum)
    }
    return (
        <input
            type="number"
            min={0}
            max={max}
            className={styles.numberInput}
            onKeyPress={onKeyPress}
            onChange={onChange}
            placeholder={rangeType.charAt(0).toUpperCase() + rangeType.slice(1)}
        />
    )
}

const RangeInput = ({ onDone }: Props) => {
    const [min, setMin] = useState(Number.MIN_VALUE)
    const [max, setMax] = useState(Number.MIN_VALUE)

    return (
        <div className={styles.rangeInput}>
            <NumberInput
                max={max}
                rangeType="min"
                handler={(num) => {
                    setMin(num)
                    onDone && onDone(num, max)
                }}
            />
            <span>-</span>
            <NumberInput
                max={max}
                rangeType="max"
                handler={(num) => {
                    setMax(num)
                    onDone && onDone(min, num)
                }}
            />
        </div>
    )
}

export default RangeInput

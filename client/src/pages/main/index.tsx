import React, { useState } from 'react'
import styles from './index.module.scss'
import { toast } from 'react-toastify'

interface IDisks {
    number: string
    width: string
}

const disks: IDisks[] = [
    {
        number: '1',
        width: '100px'
    },
    {
        number: '2',
        width: '150px'
    },
    {
        number: '3',
        width: '200px'
    },
    {
        number: '4',
        width: '250px'
    },
    {
        number: '5',
        width: '300px'
    },
    {
        number: '6',
        width: '350px'
    },
    {
        number: '7',
        width: '400px'
    },
    {
        number: '8',
        width: '450px'
    },
]

export const Main = () => {

    const [active, setActive] = useState<string | undefined>()
    const [activeColumn, setActiveColumn] = useState<number | undefined>()
    const [column1, setColumn1] = useState<IDisks[]>(disks)
    const [column2, setColumn2] = useState<IDisks[]>([])
    const [column3, setColumn3] = useState<IDisks[]>([])

    const handleSelect = (number: string, column: number) => {
        let smallestDisk;
        if (column === 1) {
            smallestDisk = column1.reduce((prev, current) => (prev.number < current.number ? prev : current));
        } else if (column === 2) {
            smallestDisk = column2.reduce((prev, current) => (prev.number < current.number ? prev : current));
        } else if (column === 3) {
            smallestDisk = column3.reduce((prev, current) => (prev.number < current.number ? prev : current));
        }
    
        if (smallestDisk?.number !== number) return;
    
        setActive(number);
        setActiveColumn(column);
    };
    
    const handleMove = (targetColumn: number) => {
        if (!active || activeColumn === undefined) return;

        const isTargetColumnEmpty = targetColumn === 1 ? column1.length === 0 : targetColumn === 2 ? column2.length === 0 : column3.length === 0;
        const maxDiskInTargetColumn = Math.min(...(targetColumn === 1 ? column1 : targetColumn === 2 ? column2 : column3).map(disk => Number(disk.number)));
    
        let diskToMove;
        if (activeColumn === 1) {
            diskToMove = column1.find(disk => disk.number === active);
            if (isTargetColumnEmpty || Number(diskToMove?.number) < maxDiskInTargetColumn) {
                setColumn1(column1.filter(disk => disk.number !== active));
            } 
        } else if (activeColumn === 2) {
            diskToMove = column2.find(disk => disk.number === active);
            if (isTargetColumnEmpty || Number(diskToMove?.number) < maxDiskInTargetColumn) {
                setColumn2(column2.filter(disk => disk.number !== active));
            } 
        } else if (activeColumn === 3) {
            diskToMove = column3.find(disk => disk.number === active);
            if (isTargetColumnEmpty || Number(diskToMove?.number) < maxDiskInTargetColumn) {
                setColumn3(column3.filter(disk => disk.number !== active));
            } 
        }
    
        if (!diskToMove) return;
    
        if (isTargetColumnEmpty || Number(diskToMove.number) < maxDiskInTargetColumn) {
            if (targetColumn === 1) {
                setColumn1([diskToMove, ...column1]);
            } else if (targetColumn === 2) {
                setColumn2([diskToMove, ...column2]);
            } else if (targetColumn === 3) {
                setColumn3([diskToMove, ...column3]);
            }
        } else {
            toast.error('This disk is bigger')
        }
    
        setActive(undefined);
        setActiveColumn(undefined);
    };

    return (
        <div className={styles.main}>
            <div className={styles.parrentColumn} onClick={() => handleMove(1)} style={active ? {cursor: 'pointer'} : {}}>
                <div className={styles.column}>
                    {column1.map(el => (
                        <div onClick={() => handleSelect(el.number, 1)}
                        key={el.number}
                        className={active === el.number ? `${styles.block} ${styles.active}` : styles.block}
                        style={{maxWidth: `${el.width}`}}>
                            {el.number}
                        </div>
                    ))}
                </div>
                <button className={styles.button} onClick={() => handleMove(1)}>Move to Column 1</button>
            </div>
            <div className={styles.parrentColumn} onClick={() => handleMove(2)} style={active ? {cursor: 'pointer'} : {}}>
                <div className={styles.column}>
                    {column2.map(el => (
                        <div onClick={() => handleSelect(el.number, 2)}
                        key={el.number}
                        className={active === el.number ? `${styles.block} ${styles.active}` : styles.block}
                        style={{maxWidth: `${el.width}`}}>
                            {el.number}
                        </div>
                    ))}
                </div>
                <button className={styles.button} onClick={() => handleMove(2)}>Move to Column 2</button>
            </div>
            <div className={styles.parrentColumn} onClick={() => handleMove(3)} style={active ? {cursor: 'pointer'} : {}}>
                <div className={styles.column}>
                    {column3.map(el => (
                        <div onClick={() => handleSelect(el.number, 3)}
                        key={el.number}
                        className={active === el.number ? `${styles.block} ${styles.active}` : styles.block}
                        style={{maxWidth: `${el.width}`}}>
                            {el.number}
                        </div>
                    ))}
                </div>
                <button className={styles.button} onClick={() => handleMove(3)}>Move to Column 3</button>
            </div>
        </div>
    )
}
export const Square = ({ children, isSelected, updateBoard, index }) => {
    const classNme = `square ${isSelected ? 'is-selected' : ''}`
    
    const handleClick = () => {
      updateBoard(index)
    }
    
    return (
      <div onClick={handleClick} className={classNme}>
        {children}
      </div>
    )
  }
import React from 'react';

const Rank = ({userName, userEntries}) => {
    return(
        <div>
            <div className='white f3'>
                {`Hi ${userName}! Your image submission count is:`}
            </div>
            <div className='white f1'>
                {`${userEntries}`}
            </div>
        </div>
    )
}

export default Rank
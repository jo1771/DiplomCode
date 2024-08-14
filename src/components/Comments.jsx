import React from 'react'
import user from "../assets/images/user.png";
import star from "../assets/images/star.png";

const Comments = ({comm}) => {
    return (
        <>
            <div className="productItem-desc-bottom-comments-comment">
                <div className="productItem-desc-bottom-comments-comment-top">
                    <img src={user} alt="" />
                    <p>{comm.reviewerName}</p>
                    <p className='rating'><img src={star} alt="" />({comm.rating})</p>
                </div>
                <div className="productItem-desc-bottom-comments-comment-data">
                    <p className='productItem-desc-bottom-comments-comment-data-text'>{comm.comment}</p>
                    <p className='data'>{comm.date.slice(0, 10)}</p>
                </div>
            </div>
        </>
    )
}

export default Comments
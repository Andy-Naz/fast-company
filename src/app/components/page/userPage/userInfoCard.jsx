import React from "react"
import PropTypes from "prop-types"
import QualitiesList from "../../ui/qualities/qualitiesList"

const UserInfoCard = ({ user, onEdit }) => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={onEdit}>
                        <i className="bi bi-gear"></i>
                    </button>
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="150"
                        />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <p className="text-secondary mb-1">{user.profession.name}</p>
                            <div className="text-muted">
                                <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                                <i className="bi bi-caret-up text-secondary" role="button"></i>
                                <span className="ms-2">{user.rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                        <QualitiesList qualities={user.qualities} />
                    </p>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Completed meetings</span>
                    </h5>

                    <h1 className="display-1">{user.completedMeetings}</h1>
                </div>
            </div>
        </>
    )
}

UserInfoCard.propTypes = {
    user: PropTypes.object,
    onEdit: PropTypes.func
}

export default UserInfoCard

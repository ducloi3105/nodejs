import React from 'react';
import ReactDom from 'react-dom';
import Store from "../flux/store";
import Action from "../flux/actions";
import LeftPanelItem from './left-panel-item';
import RightPanel from './right-panel-wrapper';
import Progress from './progress-noti'

let PopupContainer = Store.connect(class extends React.Component {
    constructor() {
        super();
        this.closePopup = this.closePopup.bind(this)
    }

    closePopup() {
        Action.showPopup(false)
    }

    render() {
        let listUser = this.props.dataFollow.listUser.filter((item, index) => {
            return this.props.filter.showFollowers.min <= index && this.props.filter.showFollowers.max > index
        }).filter(item => {
            return item.node.id !== this.props.infoAccount.id;
        });
        let userFollowing = listUser.filter((item, index) => {
            return item.node.followed_by_viewer === false && item.node.requested_by_viewer === false && item.node.is_verified === false
        });

        return (
            <div className="popup-container" style={{display: this.props.showPopup?'unset': 'none'}}>
                <div id="BotInjectedContainer">
                    <div className="container-wrapper">
                        <div className="header-wrap">
                            <h1>Automation for Instagram™</h1>
                            <div className="show-total-accounts">
                                <span>Total: <b>{listUser.length}</b></span>
                                <span>Followed: <b>{listUser.length - userFollowing.length}</b></span>
                                <span>Follow up: <b>{userFollowing.length}</b></span>
                            </div>
                            <button className="close-popup" onClick={this.closePopup}/>
                        </div>
                        <div className="content-wrap">
                            <div className="left-wrap">
                                <Progress/>
                                <LeftPanelItem/>
                            </div>

                            <RightPanel/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}, appState => {
    return {
        infoAccount: appState.infoAccount,
        dataFollow: appState.dataFollow,
        filter: appState.filter,
        showPopup: appState.showPopup,
    }
})
export default PopupContainer;

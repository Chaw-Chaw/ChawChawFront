import React, { Component, ReactNode } from "react";
import { alertActions } from "../../store/alertSlice";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { AlertMessage } from ".";
import { RootState } from "../../store";

type Props = {
  children: any;
} & typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>;

type States = {
  notificationElement: HTMLElement | null;
};

class Errorboundary extends Component<Props, States> {
  state: States = {
    notificationElement: null,
  };
  componentDidCatch(error: Error) {
    this.props.updateAlert({
      name: error.name,
      message: error.message,
    });
  }

  componentDidMount() {
    // console.log(document.getElementById("notification"));
    this.setState({
      notificationElement: document.getElementById("notification"),
    });
  }
  render() {
    const alert = this.props.alert;
    return (
      <>
        {alert.length !== 0 &&
          this.state.notificationElement &&
          ReactDOM.createPortal(
            <AlertMessage />,
            this.state.notificationElement
          )}
        {this.props.children}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  alert: state.alert.alertList,
});

const mapDispatchToProps = {
  updateAlert: alertActions.updateAlert,
};
export default connect(mapStateToProps, mapDispatchToProps)(Errorboundary);

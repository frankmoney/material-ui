import React, {Component} from 'react';
import PropTypes from 'prop-types';
import transitions from '../styles/transitions';

function getStyles(props, context, state) {
  const verticalPosition = props.verticalPosition;
  const horizontalPosition = props.horizontalPosition;
  const offset = verticalPosition === 'bottom' ? 14 : -14

  const {
    baseTheme,
    zIndex,
    tooltip,
    borderRadius,
  } = context.muiTheme;

  const styles = {
    root: {
      position: 'absolute',
      fontFamily: baseTheme.fontFamily,
      fontSize: '10px',
      lineHeight: '22px',
      padding: '0 8px',
      zIndex: zIndex.tooltip,
      color: tooltip.color,
      overflow: 'hidden',
      borderRadius: tooltip.borderRadius || borderRadius,
      userSelect: 'none',
      backgroundColor: tooltip.rippleBackgroundColor,
      left: '50%',
      opacity: 0,
      transform: `translate3d(-50%, 0, 0)`,
      transition: `${transitions.easeOut('180ms', 'all', '0ms')}`
    },
    label: {
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    rootWhenShown: {
      top: verticalPosition === 'top' ? null : '100%',
      bottom: verticalPosition === 'bottom' ? null : '100%',
      marginTop: verticalPosition === 'bottom' ? 10 : 0,
      marginBottom: verticalPosition === 'top' ? 10 : 0,
      opacity: 0.9,
    }
  };

  return styles;
}

class Tooltip extends Component {
  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    horizontalPosition: PropTypes.oneOf(['left', 'right', 'center']),
    label: PropTypes.node.isRequired,
    show: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    touch: PropTypes.bool,
    verticalPosition: PropTypes.oneOf(['top', 'bottom']),
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(newProps) {
    console.log('Tooltip()', this.props, newProps);
  }


  render() {
    const {
      horizontalPosition, // eslint-disable-line no-unused-vars
      label,
      show, // eslint-disable-line no-unused-vars
      touch, // eslint-disable-line no-unused-vars
      verticalPosition, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    return (
      <div
        {...other}
        ref="tooltip"
        style={Object.assign(
          {},
          styles.root,
          this.props.show && styles.rootWhenShown,
          this.props.touch && styles.rootWhenTouched,
          this.props.style
        )}
      >
        <span style={prepareStyles(styles.label)}>
          {label}
        </span>
      </div>
    );
  }
}

export default Tooltip;

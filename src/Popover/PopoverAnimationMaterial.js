import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from '../Paper';
import transitions from '../styles/transitions';
import propTypes from '../utils/propTypes';
import compact from 'lodash/compact'
import isArray from 'lodash/isArray'


function getStyles(props, context, state) {
  const {targetOrigin} = props;
  const {open, closing} = state;
  const {muiTheme} = context;
  const horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

  return {
    root: {
      position: 'fixed',
      overflow: 'hidden',
      zIndex: muiTheme.zIndex.popover,
      //opacity: open ? 1 : 0,
      //transform: open ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      //transition: transitions.easeOut('450ms', ['transform', 'opacity']),
      animationName: closing ? 'dropdownCloseAnimation' : open ? 'dropdownOpenAnimation' : '',
      //animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      animationDuration: closing ? '0.2s' : open ? '0.33s' : '0s',
      animationDelay: closing ? '30ms' : '0.0s',
      animationIterationCount: 1,
      animationDirection: 'normal',
      animationFillMode: 'forwards',
      maxHeight: '100%',
    },
    child: {
      opacity: !open || closing ? 0 : 1,
      transition: transitions.easeOut('150ms', ['opacity'], (closing ? '0ms' : '130ms'))
    }
  };
}

class PopoverAnimationMaterial extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    open: PropTypes.bool.isRequired,
    closing: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    targetOrigin: propTypes.origin.isRequired,
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    style: {},
    zDepth: 1,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    open: false,
    closing: false
  };

  componentDidMount() {
    this.setState({open: true}); // eslint-disable-line react/no-did-mount-set-state
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
      closing: nextProps.closing
    });
  }

  render() {
    const {
      className,
      style,
      zDepth,
    } = this.props;

    const styles = getStyles(this.props, this.context, this.state);
    const filteredChildren = isArray(this.props.children) ? compact(this.props.children) : this.props.children

    const newChildren = filteredChildren
      ? React.Children.map(filteredChildren, (child, index) => {
        //const childName = child.type ? child.type.muiName : '';
        let newChild = child;
        newChild = React.cloneElement(child, {
          style: Object.assign({}, styles.child, child.props.style),
        });

        return newChild;
      })
      : filteredChildren;

    return (
      <Paper
        style={Object.assign(styles.root, style)}
        zDepth={zDepth}
        className={className}
      >
        {newChildren}
      </Paper>
    );
  }
}

export default PopoverAnimationMaterial;

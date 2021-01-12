import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  TouchableOpacity
} from "react-native";
import Marker from "../marker";
import { ClusterParams } from ".";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    position: 'absolute',
    opacity: 0.5,
    zIndex: 0,
  },
  cluster: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontWeight: 'bold',
  },
});

type Props = {
  cluster: ClusterParams;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  onPress?: (params: ClusterParams) => void;
};

export default class ClusterView extends React.PureComponent<Props> {
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.cluster);
    }
  };

  renderClusterView = () => {
    const { count } = this.props.cluster;
   
    const clusterColor = '#00B386';
    const clusterTextColor = '#FFFFFF';
    const spiderLineColor = '#FF0000';
    const { width, height, fontSize, size } = returnMarkerStyle(count);
    return (
      <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, { width,height }]}
    >
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: clusterColor,
            width,
            height,
            borderRadius: width / 2,
          },
        ]}
      />
      <View
        style={[
          styles.cluster,
          {
            backgroundColor: clusterColor,
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: clusterTextColor,
              fontSize,
            },
          ]}
        >
          {count}
        </Text>
      </View>
    </TouchableOpacity>
    );
  };

  render() {
    return (
      <Marker
        flat
        onPress={this.onPress}
        coordinate={this.props.cluster.coordinate}
        view={this.renderClusterView}
      />
    );
  }
}

export const returnMarkerStyle = (points) => {
  if (points >= 50) {
    return {
      width: 84,
      height: 84,
      size: 64,
      fontSize: 20,
    };
  }

  if (points >= 25) {
    return {
      width: 78,
      height: 78,
      size: 58,
      fontSize: 19,
    };
  }

  if (points >= 15) {
    return {
      width: 72,
      height: 72,
      size: 54,
      fontSize: 18,
    };
  }

  if (points >= 10) {
    return {
      width: 66,
      height: 66,
      size: 50,
      fontSize: 17,
    };
  }

  if (points >= 8) {
    return {
      width: 60,
      height: 60,
      size: 46,
      fontSize: 17,
    };
  }

  if (points >= 4) {
    return {
      width: 54,
      height: 54,
      size: 40,
      fontSize: 16,
    };
  }

  return {
    width: 48,
    height: 48,
    size: 36,
    fontSize: 15,
  };
};

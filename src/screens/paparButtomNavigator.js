import * as React from 'react';
import { BottomNavigation, Text ,TextInput} from 'react-native-paper';


import Scrollabletab from './scrollabletab';
import Mainmenu from './flatgrid';



const MusicRoute = () => <Mainmenu {...props} ></Mainmenu>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => 
{return(
<Text>Albums</Text>
)};

export default class MyComponent extends React.Component {
  
  constructor(props) {
		super(props);
  
  state = {
    text: '',
    index: 0,
    routes: [
      { key: 'music', title: 'Music', icon: 'view-grid' },
      { key: 'albums', title: 'Albums', icon: 'video-outline' },
      { key: 'recents', title: 'Recents', icon: 'qrcode-scan' },
    ],
  };
  }
  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}
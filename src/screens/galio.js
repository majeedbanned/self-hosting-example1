import React from 'react';

import { Button, Block, Card } from 'galio-framework';
import { View } from 'react-native';

const galio = () => {
	return (
		<View>
			<Block>
				<Button capitalize size="small">
					small size capitalize
				</Button>
				<Button round uppercase color="error">
					round uppercase
				</Button>
				<Button
					onlyIcon
					icon="tags"
					iconFamily="antdesign"
					iconSize={30}
					color="warning"
					iconColor="#fff"
					style={{ width: 40, height: 40 }}
				>
					warning
				</Button>
				<Button color="#50C7C7" shadowless>
					custom color and shadowless
				</Button>
				<Button round size="small" color="success">
					round and small
				</Button>
				<Card
					flex
					borderless
					style={styles.card}
					title="Christopher Moon"
					caption="139 minutes ago"
					location="Los Angeles, CA"
					avatar="http://i.pravatar.cc/100?id=skater"
					imageStyle={styles.cardImageRadius}
					imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
					image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
				/>
			</Block>
		</View>
	);
};

export default galio;

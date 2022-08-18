import Navigation from "../components/Navigation";
import Feed from "../components/Feed";

import {useStateValue} from "../utils/context/StateProvider";

const Home = () => {
	const [{user, auth}, dispatch] = useStateValue();

	if (user) {
		return (
			<div className='wrapper'>
				<Navigation user={user} />
				<Feed />
			</div>
		);
	}
};

export default Home;

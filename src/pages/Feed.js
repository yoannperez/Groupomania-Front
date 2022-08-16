import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Article from "../components/Article";
import NewPost from "../components/NewPost/NewPost";
import {useStateValue} from "../utils/context/StateProvider";

const Feed = () => {
	const history = useNavigate();
	const [newsData, setNewsData] = useState([]);
	const [reload, setReload] = useState(false);
	const [spinner, setSpinner] = useState(false);
	const [{user}, dispatch] = useStateValue();

	useEffect(() => {
		if (user) {
			setSpinner(true);
			getData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	const getData = () => {
		axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
		axios.get(process.env.REACT_APP_API_ADRESS + "/api/posts/").then((res) => {
			setNewsData(res.data);
			setSpinner(false);
		});
	};

	const refresh = () => {
		setReload(!reload);
	};

	if (!user) {
		history.push("/");
		return null;
	} else {
		return (
			<div className='feedContainer'>
				<h1>Feed</h1>
				{/* <NewPost user={user} refresh={refresh} />
				<h1>Derniers articles</h1>
				{spinner ? (
					<div className='Loader'></div>
				) : (
					<div>
						{newsData
							.sort((a, b) => b.id - a.id)
							.map((post) => (
								<Article key={post.id} article={post} refresh={refresh} />
							))}
					</div>
				)} */}
			</div>
		);
	}
};

export default Feed;

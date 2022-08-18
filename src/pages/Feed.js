import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Post from "../components/Post";
import NewPost from "../components/NewPost/NewPost";
import {useStateValue} from "../utils/context/StateProvider";
import {getAllPostsAxios} from "../services/postService";

const Feed = () => {
	const history = useNavigate();
	const [postsData, setPostsData] = useState([]);
	const [refreshPage, setRefreshPage] = useState(false);
	const [spinner, setSpinner] = useState(false);
	const [{user, auth}, dispatch] = useStateValue();

	useEffect(() => {
		setSpinner(true);
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshPage]);

	const getData = async () => {
		let {data} = await getAllPostsAxios();
		setPostsData(data);
		setSpinner(false);
	};

	const refresh = () => {
		setRefreshPage(!refreshPage);
	};

	return (
		<div className='feedContainer'>
			<NewPost user={user} refresh={refresh} />
			<h1>Derniers articles</h1>
			{spinner ? (
				<div className='Loader'></div>
			) : (
				<div>
					{postsData
						.sort((a, b) => b.id - a.id)
						.map((post) => (
							<Post key={post.id} article={post} refresh={refresh} />
						))}
				</div>
			)}
		</div>
	);
};

export default Feed;

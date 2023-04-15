import { useEffect, useState } from 'react'

import SaveOutline from '../Posts/Post/Save/SaveOutline'
import SaveFill from '../Posts/Post/Save/SaveFill';

import { useAddSavePostMutation, useGetSavedPostsQuery, useRemoveSavedPostMutation } from 'features/savedPost/savedPostSlice';
import { useSelector } from 'react-redux';

const SavePost = (props) => {
    const [isSaved, setIsSaved] = useState(false);

    const { token } = useSelector(state => state.auth);

    const { data: res, isSuccess } = useGetSavedPostsQuery(token);

    const [addSavePost] = useAddSavePostMutation();
    const [removeSavedPost] = useRemoveSavedPostMutation();

    useEffect(() => {
        if (!isSuccess) return;

        //If the id of current post id exist on savedPosts postId then we isSaved state to true.
        const found = res.data.find(obj => obj.postId === props.postId)
        if (found) {
            setIsSaved(found);
        }
    }, [isSuccess])

    const onSaveHandler = async () => {
        setIsSaved((pre) => !pre);
        console.log(isSaved);
        try {
            let res;
            if (!isSaved) {
                res = await addSavePost({ postId: props.postId, token }).unwrap();
            }
            else {
                res = await removeSavedPost({ postId: props.postId, token }).unwrap();
            }
            console.log('Response from savePost Component.', res);
        } catch (err) {
            console.log('Error from savePost Component.', err);
        }
    };

    return (
        <span onClick={onSaveHandler}>
            {isSaved ? <SaveFill /> : <SaveOutline />}
        </span>
    )
}

export default SavePost
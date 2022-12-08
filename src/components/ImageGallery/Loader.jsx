import { ColorRing } from 'react-loader-spinner';
import { ImageGalleryLoader } from './ImageGallery.styled';

export const Loader = () => {
    return (
        <ImageGalleryLoader>
            <ColorRing/>
        </ImageGalleryLoader>
    )
}
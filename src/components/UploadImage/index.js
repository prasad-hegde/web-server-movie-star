import React from 'react';
import ImageUploading from 'react-images-uploading';
import styled from 'styled-components';
import DeleteIcon from '../../assets/icons/delete';
import { FormElement, MovieCard } from '../../commonStyle';
import { colors } from '../../pallette';
import Button from '../Button';


const ImagePreview = styled.div`
`
const Container = styled.div`
display:flex;
flex-direction:column;
`
const Image = styled.img`
width: 100%;
height: 100%;
`

const DeleteWrap = styled.div`
margin:0 0.5rem;
`
export default function UploadImage({OnUpload}) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const handleChange  = (imageList, addUpdateIndex) => {
    // data for submit
    OnUpload(imageList[addUpdateIndex]?.data_url);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        value={images}
        onChange={handleChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                dragProps,
            }) => (
                <Container>
                    <ImagePreview>
                          {imageList.map((image, index) => (
                            <MovieCard style={{maxWidth: '12rem',margin:0}} key={index} className="image-item">
                                <Image src={image['data_url']} alt="" width="100%" />
                            </MovieCard>
                        ))}
                    </ImagePreview>
                    <FormElement>
                        <Button
                            label={imageList.length > 0?'Update Image':'Choose Image'}
                            onClick={onImageUpload}
                            color={colors.browny}
                            {...dragProps}
                          />
                          
                          {imageList.length > 0 &&
                            <DeleteWrap>
                            <Button
                                label="X"
                                onClick={onImageRemoveAll}
                                color={colors.browny}
                                {...dragProps}
                                />
                        </DeleteWrap>
                            }
                     </FormElement>
                      {/* {imageList.length > 0 &&
                        <FormElement>
                        <Button
                            label="X"
                            onClick={onImageRemoveAll}
                            color={colors.browny}
                            {...dragProps}
                        />
                    </FormElement>} */}
                </Container>
            )}
      </ImageUploading>
      
    </div>
  );
}
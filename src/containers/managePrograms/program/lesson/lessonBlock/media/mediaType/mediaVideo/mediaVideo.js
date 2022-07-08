import React, { useState, useEffect, useCallback, createRef } from "react";
import { Row, Col, Input, Button } from 'reactstrap';
import { Card, ListGroup, ListGroupItem } from "shards-react";
import { useDropzone } from 'react-dropzone'

import { TextBox, UrlBox } from '../../../../../../../../components/common/FormsInput';
import MediaList from '../../mediaList/mediaList';
import MediaHeader from '../MediaHeader/MediaHeader';
import '../media.scss';
const MediaVideo = ({ tab, _handleMedia, _handleSelected, className = '', media, availableMedia, editable = {} }) => {
  const titleRef = createRef(); const urlRef = createRef();
  const [mediaType, setMediaType] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [name, setName] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [videoErr, setVideoErr] = useState(false);

  useEffect(() => {
    setName('');
    setMediaType('');
    setMediaUrl('');
    setIsSubmit(true);
    setVideoErr(false);
    titleRef.current.props.onChange('');
    urlRef.current.props.onChange('');
  }, [tab]);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0].type.includes('video')) {
      setMediaUrl(acceptedFiles);
      setVideoErr(false);
      setMediaType('media');
    } else { setVideoErr(true); }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const checkValidationAndSubmit = (type) => {
    setIsSubmit(false);
    titleRef.current.props.onChange(name);
    if (type === 'url') {
      if (mediaType === 'media') { urlRef.current.props.onChange('') }
      else {
        urlRef.current.props.onChange(mediaUrl);
        if (name === '' || mediaUrl === '') console.log("Values should not be empty");
        else if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(mediaUrl) && mediaUrl.length > 0) console.log("URL should be Correct : ", mediaUrl);
        else {
          _handleMedia({ name: name, mediaType: mediaType, mediaUrl: mediaUrl });
          setName('');
          setMediaType('');
          setMediaUrl('');
          setIsSubmit(true);
          titleRef.current.props.onChange('');
          urlRef.current.props.onChange('');
        }
      }
    }
    if (type === 'media') {
      if (name === '' || !mediaUrl) console.log("Values should not be empty");
      else {
        _handleMedia({ name: name, mediaType: mediaType, mediaUrl: mediaUrl });
        setName('');
        setIsSubmit(true);
        setMediaUrl('');
        setMediaType('');
        titleRef.current.props.onChange('');
      }
    }
  }

  // check selected video
  const isSelected = (id) => availableMedia.findIndex(e => e.mediaId === id) !== -1 ? true : false;

  return (
    <>
      <Card small className={`addSectionWrapper shadow-none ${className}`}>
        <MediaHeader title={editable ? 'Add Video' : 'Video'} buttonTitle='Select Video from List' />
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <div className="addSection">
                  <div className="addSection-rw d-flex flex-wrap dragDropBlockRw custom-dragDropBlockRw">
                    <div className="fileLink flex1 mb-15">
                      <TextBox Name="Video Title" Placeholder="Enter Video Title" min={1} value={name} isRequired={!isSubmit} handleVal={(val) => setName(val)} edit={editable} ref={titleRef} />
                    </div>
                  </div>
                  <div className="outer-drag mb-15">
                    <div className="dragDropBlock d-flex flex1 align-items-center justify-content-center" {...getRootProps()}>
                      <div className="dragDropCell d-flex flex-wrap flex1 align-items-center justify-content-center">
                        <label className="mb-0 d-flex align-items-center justify-content-center">
                          <i className="material-icons">cloud_upload</i>Drag &amp; Drop files here.</label><span>or</span>
                        <div className="position-relative browseCell btn btn-link d-flex align-items-center justify-content-center">
                          <input accept="video/mp4,video/x-m4v,video/*" {...getInputProps()} /> Browse Files
                          {/* <Input type="file" name="file" accept="video/mp4,video/x-m4v,video/*" {...getInputProps()} className="position-absolute" />Browse Files */}
                          {/* onChange={(e) => handleSelectMedia(e.target.files)} */}
                        </div>
                      </div>
                    </div>
                    <span className="orLabel d-flex align-items-center justify-content-center">
                      <span className=" d-inline-flex align-items-center justify-content-center rounded-circle">or</span>
                    </span>
                    <div className="fileLink flex1">
                      <UrlBox className="inputBtnWrapper" value={mediaUrl} button={true} isRequired={!isSubmit} Name="Add LInk" handleVal={val => { setMediaType('url'); setMediaUrl(val) }} handleClick={() => checkValidationAndSubmit('url')} Placeholder="Add LInk" min={1} edit={true} ref={urlRef} />
                    </div>
                  </div>
                  {videoErr && <div className="erro danger">You can only select video.</div>}
                </div>

                {/* {console.log("mediaType, mediaUrl :", mediaType, mediaUrl)} */}
                {mediaType === 'media' && !videoErr && <div>
                  <div className='mediaCell d-flex flex-column position-relative video-section-dv'>
                    <Button theme="link" className="video-del-btn btn-secondary" onClick={() => setMediaType('')}>
                      <i className="material-icons">clear</i>
                    </Button>
                    <div className="mediaBox d-flex align-items-left justify-content-left overflow-hidden custom-delete-box ">

                      <video width="320" height="315" src={mediaUrl[0] && URL.createObjectURL(mediaUrl[0])} controls></video>
                    </div>
                  </div>
                  {mediaType === 'media' && !videoErr && <div className="editor-btm mt-3 text-right media-action-btn mb-15">
                    <Button color="primary" onClick={() => checkValidationAndSubmit('media')}>Save</Button>
                  </div>}
                </div>
                }
                {mediaType !== 'media' && <div className="addSection-rw">
                  <MediaList data={{ mediaType: 'video', list: media }} handleVal={val => _handleSelected(val)} isChecked={e => isSelected(e)} editable={editable} />
                </div>}

              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
  )
};

export default MediaVideo;

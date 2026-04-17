import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './AvatarCropper.css';

async function getCroppedImg(imageSrc, croppedAreaPixels) {
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  const size = 300;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    croppedAreaPixels.x, croppedAreaPixels.y,
    croppedAreaPixels.width, croppedAreaPixels.height,
    0, 0, size, size
  );

  return canvas.toDataURL('image/jpeg', 0.85);
}

export default function AvatarCropper({ imageSrc, onDone, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, cap) => setCroppedAreaPixels(cap), []);

  const handleApply = async () => {
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    onDone(cropped);
  };

  return (
    <div className="cropper-overlay" role="dialog" aria-modal="true" aria-label="Crop your photo">
      <div className="cropper-modal">
        <button className="cropper-close" onClick={onCancel} aria-label="Cancel">✕</button>
        <h3 className="cropper-title">Crop your photo</h3>

        <div className="cropper-area">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={true}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="cropper-zoom">
          <span>🔍</span>
          <input
            type="range" min={1} max={3} step={0.05}
            value={zoom} onChange={e => setZoom(Number(e.target.value))}
            aria-label="Zoom"
          />
        </div>

        <div className="cropper-actions">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}

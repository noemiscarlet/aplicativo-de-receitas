import { useState } from 'react';
import share from '../../images/shareIcon.svg';

type CopyToClipboardProps = {
  textToCopy: string;
};

export default function ShareButton({ textToCopy }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (textToCopy.includes('in-progress')) {
      const [, item, id] = textToCopy.split('/');
      navigator.clipboard.writeText(`http://localhost:3000/${item}/${id}`);
      setCopied(true);
    } else {
      navigator.clipboard.writeText(`http://localhost:3000${textToCopy}`);
      setCopied(true);
    }
  };

  return (
    <div>
      <button data-testid="share-btn" onClick={ copyToClipboard }>
        {copied && <h1>Link copied!</h1>}
        <img src={ share } alt="compartilhar" />
      </button>
    </div>
  );
}

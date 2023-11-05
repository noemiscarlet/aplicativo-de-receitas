/* import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import share from '../../images/shareIcon.svg';

function ShareButton() {
  const [linkCopy, setLinkCopy] = useState(false);
  const { pathname } = useLocation();
  const copy = clipboardCopy;

  function CopyMessage() {
    if (pathname.includes('in-progress')) {
      const [, item, id] = pathname.split('/');
      copy(`http://localhost:3000/${item}/${id}`);
      setLinkCopy(true);
    } else {
      setLinkCopy(true);
      copy(`http://localhost:3000${pathname}`);
    }
  }

  return (
    <div>

      <button
        data-testid="share-btn"
        onClick={ () => CopyMessage() }
      >
        {linkCopy && <h1>Link copied!</h1> }
        <img src={ share } alt="compartilhar" />
      </button>
    </div>
  );
}
export default ShareButton;
 */

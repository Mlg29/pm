
import Translate from '@girishsawant999/react-translate-with-google-api';

const HeaderText = ({component}) => {
    return (
        <Translate language="fr" className="font-bold" style={{ color: 'red' }}>
        {component}
      </Translate>
    )
}

export default HeaderText
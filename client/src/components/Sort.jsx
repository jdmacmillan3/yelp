import Dropdown from 'react-bootstrap/Dropdown';

function Sort({sortColumn, setSortColumn}) {

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary mb-3" id="dropdown-basic">
        Sort By - {sortColumn}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick = {(e) => setSortColumn('name')} > Name A-Z </Dropdown.Item>
        <Dropdown.Item onClick = {(e) => setSortColumn('name_desc')} > Name Z-A </Dropdown.Item>
        <Dropdown.Item onClick = {(e) => setSortColumn('price_range_desc')} > Price (High to Low)</Dropdown.Item>
        <Dropdown.Item onClick = {(e) => setSortColumn('price_range')} > Price (Low to High)</Dropdown.Item>
        <Dropdown.Item onClick = {(e) => setSortColumn('location')} > Location</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Sort;

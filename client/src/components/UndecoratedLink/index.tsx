import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

// const UndecoratedLink: FC<LinkProps> = props => {
//   return <CustomLink {...props} />
// };

export default CustomLink;

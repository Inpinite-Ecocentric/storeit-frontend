// src/components/Breadcrumb/Breadcrumb.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li 
              key={index}
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {isLast ? (
                item.label
              ) : (
                item.path ? (
                  <Link to={item.path}>{item.label}</Link>
                ) : (
                  item.label
                )
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
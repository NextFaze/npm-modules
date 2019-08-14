import { QueryFn } from './queryfn.config';

// https://loopback.io/doc/en/lb3/Where-filter.html#operators
export const LOOPBACK_QUERY_FN: QueryFn = {
  EQUAL: (query, name, value) => {
    if (!value) {
      return query;
    }
    return { ...query, where: { ...query.where, [name]: value } };
  },
  NOT_EQUAL: (query, name, value) => {
    if (!value) {
      return query;
    }
    return { ...query, where: { ...query.where, [name]: { neq: value } } };
  },
  GREATER_THAN: (query, name, value) => {
    if (!value) {
      return query;
    }
    return { ...query, where: { ...query.where, [name]: { gt: value } } };
  },
  LESS_THAN: (query, name, value) => {
    if (!value) {
      return query;
    }
    return { ...query, where: { ...query.where, [name]: { lt: value } } };
  },
  NEAR: (query, name, value) => {
    if (!value) {
      return query;
    }
    return { ...query, where: { ...query.where, [name]: { near: value } } };
  },
  REGEX: (query, name, value) => {
    if (!value) {
      return query;
    }
    return { ...query, where: { ...query.where, [name]: { regexp: value } } };
  },
  INCLUDES: (query, name, value) => {
    // e.g. input value of A,B,C will search includes ['A', 'B', 'C']
    if (!value) {
      return query;
    }
    return {
      ...query,
      where: { ...query.where, [name]: { inq: value.split(',') } },
    };
  },
  NOT_INCLUDES: (query, name, value) => {
    // e.g. input value of A,B,C will search does not include ['A', 'B', 'C']
    if (!value) {
      return query;
    }
    return {
      ...query,
      where: { ...query.where, [name]: { nin: value.split(',') } },
    };
  },
};

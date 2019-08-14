import { promisify } from 'bluebird';
const ParameterizedSQL = require('loopback-connector').ParameterizedSQL;

/**
 * loopback-connector's internal model for storing sql before querying
 */
export interface ParameterizedSQL {
  sql: string;
  params: any[];
}

export class SQLHelper {
  /**
    Pass in a reference to the postgres connector retrieved from any model that uses it: `Model.dataSource.connector`
   */
  constructor(public connector: any) {}

  // Add table alias to a loopback generated query
  addTableAlias(
    query: ParameterizedSQL,
    property: string,
    model: any
  ): ParameterizedSQL {
    let { sql } = query;
    sql = sql.replace(
      new RegExp(`(${this.column(model, property)})`, 'g'),
      `${this.table(model)}.$1`
    );
    return {
      sql,
      params: query.params,
    };
  }

  /**
   * Pass in a normal loopback `where` query and get the corresponding sql clause.
   */
  buildWhere(model: any, where: any): ParameterizedSQL {
    return this.connector.buildWhere(model, where);
  }

  /**
   * Merge a set of ParameterizedSQL statements with the given separator (default ' ')
   */
  merge(
    query: ParameterizedSQL,
    joins: ParameterizedSQL[],
    separator: string = ' '
  ) {
    let { sql, params } = query;
    if (!joins.length) {
      // Loopback doesn't handle empty arrays so well - it will still add the seprator to the end
      return new ParameterizedSQL(sql, params);
    }
    return new ParameterizedSQL(sql, params).merge(joins, separator);
  }

  /**
   * Uses loopback connector to turn sql with placeholder params into actual parameterized sql:
   * { sql: 'SELECT * from table where value1 < ? AND value2 > ?', params: [4, 5] }
   *  becomes
   * { sql: 'SELECT * from table where value1 < $1 AND value2 > $2', params: [4, 5] }
   */
  parameterize(parameterized: ParameterizedSQL): ParameterizedSQL {
    return this.connector.parameterize(parameterized);
  }

  /**
   * Get the full property definition from a model
   */
  propertyDef(model: any, property: string): any {
    let modelDef = this.connector.getModelDefinition(model.modelName);
    return modelDef.properties[property];
  }

  /**
   * Uses loopback connector to return Parameterized SQL of a property/value combo with placeholder parameters
   */
  sqlParam(model: any, property: string, value: any): ParameterizedSQL {
    let modelDef = this.connector.getModelDefinition(model.modelName);
    let propertyDef = modelDef.proeprties[property];
    return this.connector.toColumnValue(propertyDef, value);
  }

  /**
   * Uses loopback connector to build an expression based on condition
   * e.g. ('created', 'lte', new Date()) => ParameterizedSQL { sql: 'created<=?', params: [ <ISO Date Sring> ] }
   */
  expression(column: string, operator: string, value: any): ParameterizedSQL {
    return this.connector.buildExpression(column, operator, value);
  }

  /**
   * Returns escaped table name string from a model to use in statements
   */
  table(model: any): string {
    return this.connector.tableEscaped(model);
  }

  /**
   * Returns escaped column name string from a property to use in statements
   */
  column(model: any, property: string): string {
    return this.connector.columnEscaped(model, property);
  }

  /**
   * Run parameterized sql built using this helper against the connector
   */
  execute(parameterized: ParameterizedSQL, options: any = {}): Promise<any[]> {
    let { sql, params } = parameterized;
    const connector = this.connector;
    let execute: any = promisify(connector.executeSQL.bind(connector));
    return execute(sql, params, options);
  }

  /**
   * Given a model and some data, build the corresponding insert statement
   */
  buildInsert(model: any, data: any, options: any): ParameterizedSQL {
    let fields = this.connector.buildFields(model, data);
    let insertStmt = this.connector.buildInsertInto(model, fields, options);
    let columnValues = fields.columnValues;
    let fieldNames = fields.names;
    if (fieldNames.length) {
      let values = ParameterizedSQL.join(columnValues, ',');
      values.sql = 'VALUES(' + values.sql + ')';
      insertStmt.merge(values);
    } else {
      insertStmt.merge(
        this.connector.buildInsertDefaultValues(model, data, options)
      );
    }
    let onConflict = this.buildOnConflict(model, options);
    if (onConflict) {
      insertStmt.merge(onConflict);
    }

    return insertStmt;
  }

  buildOnConflict(model: any, options: any): ParameterizedSQL {
    let indexes = this.connector.getModelDefinition(model).settings.indexes;
    let keys = indexes[options.index].keys;
    let key = keys.reduce((a: any, b: any) => {
      a[b[0]] = '';
      return a;
    }, {});
    let fields = this.connector.buildFields(model, key);
    let onConflict = this.buildOnConflictStmt(fields);
    return onConflict;
  }

  buildOnConflictStmt(fields: any): ParameterizedSQL {
    let stmt = new ParameterizedSQL('ON CONFLICT ');
    let columnNames = fields.names.join(',');
    if (columnNames) {
      stmt.merge('(' + columnNames + ')', '');
    }
    return stmt;
  }
}

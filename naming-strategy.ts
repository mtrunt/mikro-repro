import { AbstractNamingStrategy } from '@mikro-orm/core';

export class CustomNamingStrategy extends AbstractNamingStrategy {
  columnNameToProperty(columnName: string): string {
    return columnName.toLowerCase();
  }

  propertyToColumnName(propertyName: string): string {
    return propertyName.toLowerCase();
  }

  classToTableName(entityName: string): string {
    return entityName.toLowerCase();
  }

  joinColumnName(propertyName: string): string {
    return propertyName.toLowerCase();
  }

  joinKeyColumnName(
    entityName: string,
    referencedColumnName?: string,
    composite = false,
  ): string {
    const name =
      entityName.substr(0, 1).toLowerCase() + entityName.substr(1) + 'id';

    if (composite && referencedColumnName) {
      return name + '_' + referencedColumnName;
    }

    return name.toLowerCase();
  }

  joinTableName(
    sourceEntity: string,
    targetEntity: string,
    propertyName: string,
  ): string {
    return (
      this.classToTableName(sourceEntity) +
      '_' +
      this.propertyToColumnName(propertyName)
    );
  }

  referenceColumnName(): string {
    return 'id';
  }
}

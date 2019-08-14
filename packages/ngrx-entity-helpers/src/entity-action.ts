/**
 * Base interface for Entity Actions
 */
export interface EntityAction {
  /**
   * The Type of the action
   */
  type: string;

  /**
   * An optional payload
   */
  payload?: any;
}

export interface UserProfile {
  readonly name: string;
  readonly role: string;
}

/** Static profile until authentication exists. */
export const CURRENT_USER: UserProfile = {
  name: 'Diego',
  role: 'Agente de servicio',
};

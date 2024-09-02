import { AbilityBuilder } from "@casl/ability"
import { AppAbility } from "."
import { User } from "./models/user"
import { Role } from "./roles"

type PermissionByRole = (
    user: User,
    builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionByRole> = {
    ADMIN(_, { can }) {
        can('manage', 'all')
    },
    MENBER(user, { can }) {
        // can('invite', 'User')
        can('manage', 'Project')
        can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
    },
    BILLING() {

    },
}
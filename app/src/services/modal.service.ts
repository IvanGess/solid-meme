import type { Ref } from 'vue'
import { ref } from 'vue'

export class ModalService {
  private modals = new Map<string, Ref<boolean>>()

  register(uuid: string): void {
    if (!this.modals.has(uuid)) {
      this.modals.set(uuid, ref(false))
    }
  }

  open(uuid: string): void {
    this.register(uuid)
    this.modals.get(uuid)!.value = true
  }

  close(uuid: string): void {
    this.modals.get(uuid)!.value = false
  }

  toggle(uuid: string): void {
    this.modals.get(uuid)!.value = !this.modals.get(uuid)!.value
  }

  getState(uuid: string): Ref<boolean> {
    this.register(uuid)
    return this.modals.get(uuid)!
  }

  unregister(uuid: string): void {
    this.modals.delete(uuid)
  }
}
